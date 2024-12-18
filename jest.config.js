module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}', // ครอบคลุมทุกไฟล์ใน src
    'src/pages/index.js', // เพิ่มโฟลเดอร์ pages ทั้งหมด
    '!src/pages/_app.js', // ยกเว้น _app.js
    '!src/pages/_document.js', // ยกเว้น _document.js
    '!src/theme.js', // ยกเว้น theme.js
    '!src/store/**', // ยกเว้น store
  ],
  coverageReporters: ['json', 'lcov', 'text', 'clover'], // รูปแบบของรายงาน
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/', '<rootDir>/build/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  extensionsToTreatAsEsm: ['.jsx'], // ให้ Jest รู้จัก ESM
  testEnvironment: 'jest-environment-jsdom', // ใช้ jsdom สำหรับทดสอบ React
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'], // ให้ Jest หาไฟล์ตามลำดับนี้
  moduleNameMapper: {
    '^.+\\.(css|scss|sass)$': 'identity-obj-proxy', // Mock ไฟล์ CSS
    '^src/(.*)$': '<rootDir>/src/$1', // Map path alias ให้ Jest รู้จัก
  },
};
