const errorHandler = async (error) => {
    return new Promise((resolve) => {
        if (error.response) {
            const {
                data: { message, data },
            } = error.response;

            if (data) {
                const validationErrors = Object.values(data).join(' ');
                resolve(`${message}: ${validationErrors}`);
            }

            resolve(message);
        } else {
            resolve(error.message);
        }
    });
};

export default errorHandler;
