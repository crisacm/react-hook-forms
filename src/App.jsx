import { useForm } from 'react-hook-form';

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);

    alert("Formulario enviado");
    reset();
  });

  return (
    <>
      <form onSubmit={onSubmit} className='flex flex-col p-4'>
        { /* Nombre */}
        <div className='input-container'>
          <label htmlFor="nombre" className='input-label'>Nombre</label>
          <input type="text" className='input'
            {...register("nombre", {
              required: { value: true, message: "Nombre es requerido" },
              minLength: { value: 2, message: "Debe tener mínimo 2 caracteres" },
              maxLength: { value: 40, message: "Debe tener máximo 20 caracteres" }
            })}
          />
          {
            errors.nombre && <span>{errors.nombre.message}</span>
          }
        </div>

        { /* Apellido */}
        <div className='input-container'>
          <label htmlFor="correo" className='input-label'>Correo</label>
          <input type="email" className='input'
            {...register("correo", {
              required: { value: true, message: "Correo es requerido" },
              pattern: { value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: "Correo inválido" }
            })}
          />
          {
            errors.correo && <span>{errors.correo.message}</span>
          }
        </div>

        { /* Password */}
        <div className='input-container'>
          <label htmlFor="password" className='input-label'>Password</label>
          <input type="password" className='input'
            {...register("password", {
              required: { value: true, message: "Password es requerido" },
              minLength: { value: 4, message: "Debe tener mínimo 6 caracteres" },
              maxLength: { value: 14, message: "Debe tener máximo 20 caracteres" },
              pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, message: "Debe tener al menos una letra y un número" }
            })}
          />
          {
            errors.password && <span>{errors.password.message}</span>
          }
        </div>

        { /* Confirmar Password */}
        <div className='input-container'>
          <label htmlFor="confirmPassword" className='input-label'>Confirm Password</label>
          <input type="password" className='input'
            {...register("confirmPassword", {
              required: { value: true, message: "Confirmar Password es requerido" },
              validate: (value) => value === watch("password") || "Las contraseñas no coinciden"
            })}
          />
          {
            errors.confirmPassword && <span>{errors.confirmPassword.message}</span>
          }
        </div>

        { /* Fecha de Nacimiento */}
        <div className='input-container'>
          <label htmlFor="fechaNacimiento" className='input-label'>Fecha de Nacimiento</label>
          <input type="date" className='input'
            {...register("fechaNacimiento", {
              required: { value: true, message: "Fecha de Nacimiento es requerida" },
              validate: (value) => {
                const fechaNacimiento = new Date(value);
                const fechaActual = new Date();
                const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
                return edad >= 18 ? true : "Debes ser mayor de edad";
              }
            })}
          />
          {
            errors.fechaNacimiento && <span>{errors.fechaNacimiento.message}</span>
          }
        </div>

        { /* País */}
        <div className='input-container'>
          <label htmlFor="pais" className='input-label'>País</label>
          <select {...register("pais")} className='input'>
            <option value="ME">Mexico</option>
            <option value="CO">Colombia</option>
            <option value="AR">Argentina</option>
          </select>
          {
            watch("pais") === "CO" && (
              <>
                <label htmlFor="departamento" className='input-label inner'>Departamento</label>
                <input type="text" className='input'
                  {...register("departamento", {
                    required: { value: true, message: "Departamento es requerido" }
                  })}
                />
                {
                  errors.departamento && <span>{errors.departamento.message}</span>
                }
              </>
            )
          }
        </div>

        { /* Archivo */}
        <div className='input-container'>
          <label htmlFor="foto" className='input-label'>foto de perfíl</label>
          <input type="file" className='input'
            onChange={(e) => {
              setValue("fotoDelUsuario", e.target.files[0].name);
            }}
          />
        </div>

        { /* Términos */}
        <div className='terms-container'>
          <div className='terms'>
            <input type="checkbox" className=''
              {...register("terminos", {
                required: { value: true, message: "Debes aceptar los términos y condiciones" }
              })}
            />
            <label htmlFor="terminos" className='input-label'>Acepto términos y condiciones</label>
          </div>
          {
            errors.terminos && <span>{errors.terminos.message}</span>
          }
        </div>

        <button type='submit'>
          Enviar
        </button>

        <pre>
          {JSON.stringify(watch(), null, 2)}
        </pre>
      </form>
    </>
  )
}

export default App;