import Image from "next/image";
import { useRouter } from "next/router";
export default function Client({
  id,
  avatar,
  first_name,
  last_name,
  tel,
  email,
}) {
  const { push } = useRouter();
  return (
    <tr
      style={{ cursor: "pointer" }}
      onClick={() => {
        push(`clients/${id}`);
      }}
    >
      <td scope="row">
        {avatar ? (
          <Image
            src={`http://127.0.0.1:8090/api/files/clients/${id}/${avatar}`}
            width={40}
            height={40}
            className="rounded-circle"
            alt="couldn't load Image"
            style={{ objectFit: "cover" }}
          />
        ) : (
          "N/A"
        )}
      </td>
      <td>{first_name}</td>
      <td>{last_name}</td>
      <td>{tel}</td>
      <td>{email}</td>
    </tr>
  );
}
