module.exports = {
    preset: 'ts-jest',
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json',
        },
    },
    setupFilesAfterEnv: ["jest-extended/all"],
    roots: [
        '<rootDir>/',
    ],
    testMatch: [
        '**/test/**/*.+(ts|tsx|js)',
    ],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
}