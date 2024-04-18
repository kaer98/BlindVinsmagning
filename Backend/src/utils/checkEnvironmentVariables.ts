const checkEnvironmentVariables = () => {
    if (process.env.DATABASE_URL == undefined) {
        console.log('Missing "DATABASE_URL" Environment Variable');
        process.exit()
    }

    if (process.env.JWT_SECRET == undefined) {
        console.log('Missing "JWT_SECRET" Environment Variable');
        process.exit()
    }
};

export default checkEnvironmentVariables;