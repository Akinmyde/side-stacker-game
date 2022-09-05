const Box = ({ col, row, className, data, onClick }) => {
    return (
        <div onClick={() => onClick(row, col)} className={className}>
            <div className={data.includes('X') || data.includes('O') ? '' : 'avatar'}>{data}</div>
        </div>
    )
}

export default Box
