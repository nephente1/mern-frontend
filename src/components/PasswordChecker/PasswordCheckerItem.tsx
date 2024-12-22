import './PasswordChecker.styles.css';

export const PasswordCheckerItem = ({label, met}: {label: string, met: boolean}) => {
  return (
    <li className={met ? 'checked' : ''} key={label}>
      <span className="material-symbols-outlined">{met ? 'check' : 'fiber_manual_record'}</span>
      {label}
    </li>
  )
}