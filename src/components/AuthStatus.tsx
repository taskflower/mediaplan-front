import { FC } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, googleProvider, db } from "../config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

export const AuthStatus: FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const createUserInFirestore = async (userId: string, email: string | null) => {
    try {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          email: email,
          role: "user", // domyślna rola
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        });
      } else {
        // Aktualizuj tylko datę ostatniego logowania
        await setDoc(userRef, {
          lastLogin: new Date().toISOString()
        }, { merge: true });
      }
    } catch (error) {
      console.error("Error creating/updating user in Firestore:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        await createUserInFirestore(result.user.uid, result.user.email);
      }
      navigate("/pl/admin/dashboard");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/pl/public/home");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (loading) {
    return <div className="text-gray-300 text-sm">Sprawdzanie...</div>;
  }

  if (error) {
    return (
      <div className="text-red-400 text-sm">
        <div>Błąd: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 sm:gap-4">
      {user ? (
        <>
          <Link
            to="/pl/admin/dashboard"
            className="px-2 py-1 sm:px-4 sm:py-2 rounded-lg text-white bg-gray-950 text-sm whitespace-nowrap"
          >
            Panel Admina
          </Link>
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-xs text-gray-300">{user.email}</span>
            <button
              className="text-xs text-red-400 hover:text-red-300"
              onClick={handleLogout}
            >
              Wyloguj
            </button>
          </div>
        </>
      ) : (
        <button
          className="px-2 py-1 sm:px-4 sm:py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all text-sm whitespace-nowrap"
          onClick={handleLogin}
        >
          Zaloguj przez Google
        </button>
      )}
    </div>
  );
};