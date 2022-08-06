import * as Yup from "yup";

export const validate = Yup.object({
    percentage: Yup.string()
        .matches(/^[0-9]*$/, 'Please enter again only numbers are allowed')
})