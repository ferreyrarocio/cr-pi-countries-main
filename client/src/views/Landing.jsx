import {NavLink} from 'react-router-dom'
import style from './Landing.module.css'

const Landing = () => {
    return(
        <div className={style.todo}>
             <label className={style.title}>Bienvenido!</label>
             <h3 className={style.texto}> Listo para tus vacaciones ideales? Presioná las banderas y accederás a datos importantes y a las actividades más recomendadas para que disfrutes al máximo!!</h3>
             <label className={style.texto2}>   ....éxitosミ★ </label>
            <NavLink to="/home">
                <button className={style.button}>
                    elegí tu destino !
                </button>
            </NavLink >
        </div>
    )
}
export default Landing;