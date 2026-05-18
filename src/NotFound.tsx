import {Link} from "react-router-dom";

export default function NotFound() {
    return (
        <div style={{textAlign: 'center', marginTop: '80px', color: 'white'}}>
            <h1>404</h1>
            <p style={{fontSize: '1.2rem', marginTop: '8px'}}>페이지를 찾을 수 없습니다.</p>
            <Link
                to="/"
                style={{
                    display: 'inline-flex',
                    marginTop: '20px',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    background: '#fff',
                    color: '#111',
                    fontWeight: 800,
                }}
            >
                홈으로 이동
            </Link>
        </div>
    );
}
