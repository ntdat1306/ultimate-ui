import '@emotion/react';

// Override Theme interface
// https://emotion.sh/docs/typescript
declare module '@emotion/react' {
    export interface Theme {
        [key: string]: any;
    }
}
