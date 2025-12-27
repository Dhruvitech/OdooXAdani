const Card = ({ children, title, className = '' }) => {
    return (
        <div className={`card ${className}`}>
            {title && <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600' }}>{title}</h3>}
            {children}
        </div>
    );
};

export default Card;
