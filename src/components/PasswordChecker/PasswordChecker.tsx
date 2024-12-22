import { PasswordCheckerItem } from "./PasswordCheckerItem";


const hasMinimumLenght = (password: string) => {
  return password.length >= 8;
}

const hasNumbers = (password: string) => {
  return /\d/.test(password);
} 

const hasSpecialCharacters = (password: string) => {
  return /[!@#$%^&*(),.?":{}|<>]/.test(password);
}

const hasMixedCase = (password: string) => {
  return /[A-Z]/.test(password) && /[a-z]/.test(password);
}

export const PasswordChecker = ({password}: {password: string}) => {

  const requirements = [
    {
      label: 'Password should be at least 8 characters', 
      met: hasMinimumLenght(password)
    },
    {label: 'Contains numbers', 
      met: hasNumbers(password)
    },
    {
      label: 'Contains special characters', 
      met: hasSpecialCharacters(password)
    },
    {
      label: 'Contains uppercase & lowercase', 
      met: hasMixedCase(password) 
    },
  ]

  return (
    <div className="flex-centered-column">
      <ul>
        {requirements.map(el => <PasswordCheckerItem key={el.label} label={el.label} met={el.met} />)}
      </ul>
    </div>
  )
}

