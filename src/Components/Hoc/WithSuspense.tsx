import React, {Suspense} from "react";

export function WithSuspense<WCP>(WrappedComponent: React.ComponentType<WCP>) {
    return (props: WCP) => {
        return <Suspense fallback={<h1>Loading...</h1>}>
            <WrappedComponent {...props}/>
        </Suspense>
    }
}