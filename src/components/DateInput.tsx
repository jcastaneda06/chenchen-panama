import { FC } from 'react'
import { DatePicker } from 'antd'

type Props = {
  value: string
  placeholder?: string
  onChange: (e: string) => void
}

const DateInput: FC<Props> = (props) => {
  const { placeholder, onChange } = props
  const dateFormat = 'D MMMM YYYY'

  return (
    <DatePicker
      placeholder={placeholder}
      format={dateFormat}
      onChange={onChange}
    />
  )
}

export default DateInput
