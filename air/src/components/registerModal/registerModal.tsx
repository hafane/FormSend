import { SubmitHandler, useForm } from "react-hook-form"
import cl from "./registermodal.module.css"
import { useState } from "react"

type TForm = {
	lastName: string
	name: string
	surName: string
	passport: number
	email: string
	phone: number
	gender: string
}

const RegisterModal = () => {

    const [isSended, setIsSended] = useState<boolean>(false)
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<TForm>()

	const onSubmit: SubmitHandler<TForm> = data => {
        console.log(data)
		fetch('http://localhost:5000/api', {
            method: "POST",
            headers: {
                'Content-Type':
                'application/json'
            },
            body: JSON.stringify(data)
        }).then(resp => resp.json()).then(data => {
            if(!data) return
            reset()
        }).finally(() => {
            setIsSended(true)
        })
	}
	return (
		<div className={cl.regModal}>
            {isSended && <h1>Отправлено</h1>}
			<div hidden={isSended} className={cl.modal}>
				<h1>Регистрация</h1>
				<form onSubmit={handleSubmit(onSubmit)} id="1">
					<div className={cl.fio}>
						<label htmlFor="second">Фамилия*</label>
						<input
							type="text"
							id="second"
							{...register("lastName", { required: true })}
							placeholder="Иванов"
						/>
						{errors.lastName && <span>Это поле обязательно</span>}
						<label htmlFor="name">Имя*</label>
						<input
							type="text"
							id="name"
							{...register("name", { required: true })}
							placeholder="Иван"
						/>
						{errors.name && <span>Это поле обязательно</span>}
						<label htmlFor="third">Отчество</label>
						<input
							type="text"
							id="third"
							{...register("surName", { required: false })}
							placeholder="Иванович"
						/>
						<select {...register("gender", { required: true })}>
							<option disabled>Пол:</option>
							<option value="female">Женский</option>
							<option value="male">Мужской</option>
						</select>
						{errors.gender && <span>Это поле обязательно</span>}
					</div>
					<div className={cl.info}>
						<label htmlFor="passport">Номер паспорта*</label>
						<input
							type="number"
							id="passport"
							{...register("passport", { required: true })}
							placeholder="92 3123 43"
						/>
						{errors.passport && <span>Это поле обязательно</span>}
						<label htmlFor="email">Эл.почта*</label>
						<input
							type="email"
							id="email"
							{...register("email", { required: true })}
							placeholder="email@mail.ru"
						/>
						{errors.email && <span>Это поле обязательно</span>}
						<label htmlFor="tele">Номер телефона*</label>
						<input
							type="tel"
							id="tele"
							{...register("phone", {
								required: true,
								pattern: /[0-9]\([0-9]{3}\)\-[0-9]{3}\-[0-9]{2}\-[0-9]{2}/g,
							})}
							placeholder="8(918)-123-12-21"
						/>
						{errors.phone && <span>Это поле обязательно</span>}
					</div>
				</form>
				<div className={cl.btns}>
					<button type="submit" form="1">
						Продолжить
					</button>
					<button type="reset" form="1">
						Отмена
					</button>
				</div>
			</div>
		</div>
	)
}

export default RegisterModal
