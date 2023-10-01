export default function StatusComponent({status}:{status?:'submitted'|'pending'}){
    return (
        <div>{status||'Nothing'}</div>
    )
}