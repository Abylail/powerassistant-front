
/**
 * phoneValidation
 * @param {string} phone
 * @return {boolean}
 * */
export const phoneValidation = phone => phone?.length === 11;

/**
 * phoneRawValidation
 * @param {string} phone
 * @return {boolean}
 * */
export const phoneRawValidation = phone => phone?.length === 18;

/**
 * Удаление из номера лишний символов
 * @param {string} phone
 * @return {string}
 * */
export const phonePreparing = phone => phone && phone.replaceAll(/\D+/g, "")