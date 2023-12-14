import '@emotion/react';

// Override Theme interface
// https://emotion.sh/docs/typescript
declare module '@emotion/react' {
    export interface Theme extends Record<string, any> {}
}
