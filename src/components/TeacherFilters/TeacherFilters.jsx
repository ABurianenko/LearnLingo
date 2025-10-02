import { useDispatch, useSelector } from "react-redux"
import { selectFilters } from "../../redux/filters/selectors";
import { clearFilters, setLanguage, setLevel, setPrice } from "../../redux/filters/slice";
import { Field, Form, Formik } from "formik";
import { selectLanguage } from "../../redux/languages/selectors";
import { useEffect } from "react";
import { getLanguages } from "../../redux/languages/operations";
import { LEVELS } from "../../constants/constants";

import s from './TeacherFilters.module.css'

export const TeacherFilters = () => {
    const dispatch = useDispatch();
    const filters = useSelector(selectFilters);
    const languages = useSelector(selectLanguage);
    const levels = LEVELS;

    useEffect(() => {
        dispatch(getLanguages());
    }, [dispatch])

    const hasActive = Boolean(filters.language) || Boolean(filters.level);

    return (
        <div className={s.filters_container}>
            <label className={s.filter_label}>
                <p className={s.filter_name}>Languages</p>
                <select
                    value={filters.language || ""}
                    className={s.filter_selector}
                    onChange={(e) => dispatch(setLanguage(e.target.value || ""))}
                >
                    <button className={s.filter_selector_button}>
                        <selectedcontent>Choose a language</selectedcontent>
                        <span className={s.arrow}></span>
                    </button>
                    {languages.map((language, id) => (
                        <option key={id} value={language} className={s.filter_option}>
                            <div className={s.filter_option_name}>
                                {language}
                            </div>
                        </option>
                    ))}
                </select>
            </label>
            <label className={s.filter_label}>
                <p className={s.filter_name}>Level of knowledge</p>
                <select
                    value={filters.level || ""}
                    className={s.filter_selector}
                    onChange={(e) => dispatch(setLevel(e.target.value || ""))}
                >
                    <button className={s.filter_selector_button}>
                        <selectedcontent>Choose a level</selectedcontent>
                        <span className={s.arrow}></span>
                    </button>
                    {levels.map((level, id) => (
                        <option key={id} value={level} className={s.filter_option}>
                            <div className={s.filter_option_name}>
                                {level}
                            </div>
                        </option>
                    ))}
                </select>
            </label>

            {hasActive && (
                <button
                    type="button"
                    className={s.clear_btn}
                    onClick={() => dispatch(clearFilters())}
                >
                    Clear
                </button>
            )}
        </div>
    )
}