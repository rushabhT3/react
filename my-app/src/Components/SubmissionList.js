const SubmissionList = ({submissions}) => {
    return(
        <div>
            {submissions.map((submission) => (
                <p key={submission.id}> {submission.name} {submission.age}</p>
            ))}
        </div>
    )
}

export default SubmissionList;