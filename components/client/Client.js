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
      style={{ cursor: "pointer", lineHeight: "40px", maxHeight: "40px" }}
      onClick={() => {
        push(`clients/${id}`);
      }}
    >
      <td scope="row">
        <Image
          src={
            avatar
              ? `http://${
                  process.env.NODE_ENV === "production"
                    ? "sewing_api:8080"
                    : "127.0.0.1:8090"
                }/api/files/clients/${id}/${avatar}`
              : "/noavatar.svg"
          }
          width={40}
          height={40}
          className="rounded-circle"
          alt="couldn't load Image"
          style={{ objectFit: "cover" }}
        />
      </td>
      <td>{first_name}</td>
      <td>{last_name}</td>
      <td>{tel}</td>
      <td>{email}</td>
    </tr>
  );
}
