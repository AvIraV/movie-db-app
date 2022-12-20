import { Component } from "react";

import "./ErrorBoundary.css";

class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  // eslint-disable-next-line no-unused-vars
  componentDidCatch(error, errorInfo) {
    this.setState({
      error: true,
    });
  }

  render() {
    if (this.state.error) {
      return <h2 className="error">Something went wrong!</h2>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
