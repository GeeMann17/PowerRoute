import { SignupForm } from '@/components/providers/signup-form'

export const metadata = {
  title: 'Apply as a Provider | PowerRoute',
  description: 'Join the PowerRoute vendor network. Apply to become an approved IT logistics provider.',
}

export default function ProviderSignupPage() {
  return (
    <div className="min-h-screen bg-zinc-950 py-12">
      <div className="container mx-auto px-4">
        <SignupForm />
      </div>
    </div>
  )
}
