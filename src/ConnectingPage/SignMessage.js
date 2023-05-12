
import { useSignMessage } from 'wagmi'

export function SignMessage() {
 const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
 message: 'I want to login on INOCYX at 2023-01-30T14:56:51.454Z.  https://static.inocyx.com/terms.pdf and I am at least 13 years old.',
 })

 return (
 <div>
 <button disabled={isLoading} onClick={() => signMessage()}>
 Sign message
 </button>

 </div>
 )
}
