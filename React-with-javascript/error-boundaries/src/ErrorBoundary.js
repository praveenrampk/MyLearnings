import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
    
    constructor(props) {
        super(props);
        this.state = { hasError: false };
      }
    
      static getDerivedStateFromError(error) {
        return { hasError: true };
      }

    render () {
        if (this.state.hasError) {
            return <div>Error Caught handled</div>
        }
        return (
            <div>
                Error Boundaries
            </div>
        )
    }
}