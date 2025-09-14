import React from 'react';
import styles from './app.module.scss';

const App: React.FC = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Hello React 17!</h1>
        </div>
    );
};

export default App;