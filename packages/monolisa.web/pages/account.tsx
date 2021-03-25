import { DashboardLayout } from '../components/layouts'
import { FieldSet, FieldSets, withAuth } from '../components'
import { useAppContext } from '../hooks'

const Account = () => {
  const url = '/api/user'

  const { member } = useAppContext()

  const handleSucess = ({ response }) => {
    member?.set(response)
  }

  return (
    <DashboardLayout
      pageTitle={`${member?.slug} : Account`}
      title="Your account"
      aside={' '}
      pull
    >
      <FieldSets>
        <FieldSet
          focus
          url={url}
          method="PATCH"
          name="name"
          value={member?.name}
          title="Your Name"
          description="Please enter your full name, or a display name you are comfortable with."
          placeHolder="Please use 32 characters at maximum."
          validation={{
            required: true,
            isName: true,
            maxLength: 32,
            minLength: 3,
          }}
          onSuccess={handleSucess}
        />
        <FieldSet
          url={url}
          method="PATCH"
          name="email"
          value={member?.email}
          title="Your Email"
          description="Please enter the email address you want to use to login with app."
          placeHolder="We will email you to verify the change."
          validation={{
            required: true,
            isEmail: true,
          }}
          onSuccess={handleSucess}
        />
      </FieldSets>
    </DashboardLayout>
  )
}
export default withAuth(Account)
