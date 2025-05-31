import { FC } from 'react'
import Information from '../components/Info'
import { MailOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons'

const Suggestions: FC = () => {
  return (
    <main className='flex flex-wrap flex-col-reverse md:flex-row gap-4'>
      <section>
        <article>
          <p className='text-lg'>
            🚀¿Tienes recomendaciones, peticiones, ideas o simplemente
            comentarios?
          </p>
        </article>
        <section className='my-4'>
          <p className='text-md text-gray-500 mb-2'>
            ¡Dejanos saber directamente a nuetro correo!
          </p>
          <form
            className='flex flex-col gap-2'
            action='https://formsubmit.co/chenchenpanama@gmail.com'
            method='POST'
          >
            <div className='flex flex-col gap-2'>
              <div className='flex gap-2 items-center'>
                <UserOutlined />
                <label htmlFor='name'>Nombre</label>
              </div>
              <div>
                <input
                  className='input-base'
                  type='text'
                  name='name'
                  required
                />
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <div className='flex gap-2 items-center'>
                <MailOutlined />
                <label htmlFor='email'>Correo</label>
              </div>
              <div>
                <input
                  className='input-base'
                  type='email'
                  name='email'
                  required
                />
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <div className='flex gap-2 items-center'>
                <MessageOutlined />
                <label htmlFor='message'>Mensaje o sugerencia</label>
              </div>
              <div>
                <textarea
                  className='input-base resize-none w-72 h-32'
                  name='message'
                  required
                />
              </div>
            </div>
            <div>
              <button
                className='button'
                type='submit'
              >
                Enviar
              </button>
            </div>
          </form>
        </section>
      </section>
      <section className='flex flex-col gap-4 items-start justify-center flex-1'>
        <Information
          text='Chen Chen Panamá es una iniciativa independiente y tanto su creador como
        la aplicación web no se encuentra afiliada a ningun medio, red o partido
        político. Toda la información accesible en esta página web es
        información pública.'
        />
        <div className='flex justify-center items-center'>
          <a href='https://www.buymeacoffee.com/jcs98126d'>
            <img src='https://img.buymeacoffee.com/button-api/?text=Cómprame un café&emoji=&slug=jcs98126d&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff' />
          </a>
        </div>
      </section>
    </main>
  )
}

Suggestions.displayName = 'Suggestions'

export default Suggestions
