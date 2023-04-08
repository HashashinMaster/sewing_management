import Image from "next/image";
export default function Client({
  id,
  avatar,
  first_name,
  last_name,
  tel,
  email,
  sexe,
  age,
  profession,
  adresse,
}) {
  return (
    <tr style={{ cursor: "pointer" }}>
      <td scope="row">
        {avatar ? (
          <Image
            src={`http://127.0.0.1:8090/api/files/clients/${id}/${avatar}`}
            width={40}
            height={40}
            className="rounded-circle"
            style={{ "object-fit": "cover" }}
          />
        ) : (
          "N/A"
        )}
      </td>
      <td>{first_name}</td>
      <td>{last_name}</td>
      <td>{tel}</td>
      <td>{email}</td>
      <td>{sexe}</td>
      <td>{age ? age : "N/A"}</td>
      <td>{profession ? profession : "N/A"}</td>
      <td>{adresse ? adresse : "N/A"}</td>
    </tr>
  );
}
