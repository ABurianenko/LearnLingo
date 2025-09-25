import { AuthNav } from '../AuthNav/AuthNav'
import { Navigation } from '../Navigation/Navigation'
import s from './Header.module.css'

export const Header = ({className}) => {
    return (
        <header className={className}>

            <div className={s.logo}>
                <div className={s.logo_img}></div>
                <p className={s.logo_name}>LearnLingo</p>
            </div>

            <Navigation />
            <AuthNav />
            
        </header>
    )
}