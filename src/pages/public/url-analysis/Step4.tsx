import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/Button";
import { Card } from "../../../components/Card";

import StaticAnalitics from "../../mixed/staticAnalitics";

const Step4: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 py-8">
      <Card>
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Krok 4: Wyniki analizy strony
            </h2>
            <div className="text-sm text-gray-600">
              url
              {/* {url} */}
            </div>
          </div>

          <StaticAnalitics />

          <div className="flex justify-between mt-8">
            <Button
              variant="secondary"
              onClick={() => navigate("/pl/public/url-analysis-step3")}
            >
              Wstecz
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate("/pl/public/url-analysis-summary")}
            >
              Podsumowanie
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Step4;
