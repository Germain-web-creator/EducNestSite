import { RegisterForm } from '@/components/auth/RegisterForm'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">EducNest</h1>
          <p className="text-gray-600">Le berceau du savoir panafricain</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}
