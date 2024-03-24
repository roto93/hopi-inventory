import { eventsQuery } from '@/_lib/eventQueries'

const UserPage = async () => {
  const events = await eventsQuery()

  return (
    <div>
      {/* UserPage {currentUser} */}
      <div>
        {events?.map(i => (<>
          <p>{i.name}</p>
          <p>{i.startDate}</p>
          <p>{i.endDate}</p>
        </>
        ))}
      </div>
    </div>
  )
}

export default UserPage