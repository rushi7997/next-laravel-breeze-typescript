interface IAuthSessionStatus {
    status: string | null;
    className: string;
}

const AuthSessionStatus = (props: IAuthSessionStatus) => (
    <>
        {props.status && (
            <div
                className={`${props.className} font-medium text-sm text-green-600`}>
                {props.status}
            </div>
        )}
    </>
)

export default AuthSessionStatus
