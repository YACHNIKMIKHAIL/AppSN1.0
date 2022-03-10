import React, {ComponentType, Suspense} from "react";

export function WithSuspense(Component: ComponentType) {
    return (props: any) => {
        return <Suspense fallback={<h1>Loading...</h1>}>
            <Component {...props}/>
        </Suspense>
    }
}