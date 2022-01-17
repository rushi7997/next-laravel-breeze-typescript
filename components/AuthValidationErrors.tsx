interface IAuthValidationErrors {
  errors: string[];
  className?: string;
}

const AuthValidationErrors = (props: IAuthValidationErrors) => (
    <>
        {props.errors.length > 0 && (
            <div className={props.className}>
                <div className="font-medium text-red-600">
                    Whoops! Something went wrong.
                </div>

                <ul className="mt-3 list-disc list-inside text-sm text-red-600">
                    {props.errors.map(error => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
            </div>
        )}
    </>
)

export default AuthValidationErrors
