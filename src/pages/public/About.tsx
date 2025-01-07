// # src/pages/public/About.tsx
import { FC } from 'react'

const About: FC = () => {
  return (
    <div className="prose max-w-none">
      <h1>O nas</h1>
      <p className="lead">
        To jest strona o nas, możesz tutaj umieścić informacje o swojej firmie lub projekcie.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Nasza Misja</h2>
            <p>Opis misji firmy lub projektu.</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Nasza Wizja</h2>
            <p>Opis wizji firmy lub projektu.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About