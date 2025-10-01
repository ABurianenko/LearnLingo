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

    const initialValues = {
        language: filters.language || '',
        level: filters.level || '',
        price: filters.price || '',
    }

    const hasActiveFilters = () => {
        return filters.language || filters.level || filters.price;
    }

    const handleSubmit = (values) => {
        dispatch(setLanguage(values.language));
        dispatch(setLevel(values.level));
        dispatch(setPrice(values.price));
    }

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true}>
            {({ handleSubmit }) => (
                <Form className={s.filters_container} onSubmit={handleSubmit}>
                    <label className={s.filter_label}>
                        <p className={s.filter_name}>Languages</p>
                        <Field as="select" name="language" className={s.filter_selector}>
                            <option value="" disabled hidden>
                                Choose a language
                            </option>
                            {languages.map((language, id) => (
                                <option key={id} value={language} className={s.filter_option}>
                                    {language}
                                </option>
                            ))}
                        </Field>
                    </label>
                    <label className={s.filter_label}>
                        <p className={s.filter_name}>Level of knowledge</p>
                        <Field as="select" name="level" className={s.filter_selector}>
                            <option value="" disabled hidden>
                                Choose a level
                            </option>
                            {levels.map((level, id) => (
                                <option key={id} value={level} className={s.filter_option}>
                                    {level}
                                </option>
                            ))}
                        </Field>
                    </label>

                    {hasActiveFilters() && (
                        <button
                            type="button"
                            onClick={() => dispatch(clearFilters())}
                        >
                            Clear filters
                        </button>
                    )}
                </Form>
            )}
        </Formik>
    )
}