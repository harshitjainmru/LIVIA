export const START_BASE_PATH='api'
/** */
export const SIGNUP_END_POINT= `${START_BASE_PATH}/lab-signup`
export const LOGIN_END_POINT=`${START_BASE_PATH}/lab-auth`
export const LAB_REPORT_END_POINT=`offset=0&limit=10&search=&claim_start_date=&claim_end_date=&status=`
export const CLAIM_END_POINT=`offset=0&limit=10&search=&claim_start_date=&claim_end_date=&status=`

export const LAB_TEST_END_POINT=`${START_BASE_PATH}/lab-test?offset=0&limit=10&search=&insurance_company_id=`
export const PAYMENT_TEST_END_POINT=`${START_BASE_PATH}/lab-payment?limit=10&offset=0&search=&claim_start_date=&claim_end_date=&status=`
export const PROFILE_END_POINT=`${START_BASE_PATH}/lab-profile`
export const BALANCE_END_POINT=`${START_BASE_PATH}/user-lab-test`
export const SEND_LAB_REPORT = `${START_BASE_PATH}/lab-report`
export const VERIFY_OTP = `${START_BASE_PATH}/lab-request`
export const INITIATE_PAYMENT = `${START_BASE_PATH}/lab-payment`
export const MY_FORMATS = {
    parse: {
        dateInput: 'LL'
    },
    display: {
        dateInput: 'YYYY-MM-DD',
        monthYearLabel: 'YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'YYYY'
    }
};
