import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    
    console.error('ErrorBoundary caught an error', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-50 dark:bg-red-900/50 rounded-lg text-red-700 dark:text-red-200">
          <h3 className="font-semibold">Something went wrong rendering this section</h3>
          <pre className="whitespace-pre-wrap text-sm mt-2">{String(this.state.error)}</pre>
        </div>
      )
    }

    return this.props.children
  }
}
