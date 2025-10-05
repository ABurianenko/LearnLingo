import clsx from 'clsx'
import s from './Skeleton.module.css'

export default function Skeleton({ className }) {
    return (
        <div className={clsx(s.skeleton, className)}></div>
    )
}