import React from 'react'
 
export default function Error({location}) {
    return (
        <div className="error-page">
            <h1>404,您要找的{location.pathname}不存在</h1>
        </div>
    )
}
