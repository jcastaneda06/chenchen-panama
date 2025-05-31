import { Input } from 'antd'
import { ChangeEvent, FC } from 'react'

type Props = {
  value?: string | number
  name?: string
  type: 'text' | 'number'
  placeholder?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const TextInput: FC<Props> = (props) => {
  const { value, name, type, placeholder, onChange } = props
  return (
    // <input
    //   className="outline-0 input-base w-full"
    //   type={type}
    //   name={name}
    //   value={value}
    //   placeholder={placeholder}
    //   onChange={onChange}
    // />
    <Input
      name={name}
      value={value}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    />
  )
}

export default TextInput
