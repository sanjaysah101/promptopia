const getEnvironmentVariable = (environmentVariable: string): string => {
    const unValidatedEnvironmentVariable = process.env[environmentVariable];
    if(!unValidatedEnvironmentVariable){
        throw new Error(
            `Couldn't find environment variable: ${environmentVariable}`
        )
    }else{
        return unValidatedEnvironmentVariable;
    }
}

export const config = {
    MONGODB_URI: getEnvironmentVariable("MONGODB_URI"),
    GOOGLE_CLIENT_SECRET: getEnvironmentVariable("GOOGLE_CLIENT_SECRET"),
    GOOGLE_ID: getEnvironmentVariable("GOOGLE_ID")
}