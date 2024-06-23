import { Admin } from "../entities/Admin";

interface IAdminRepository {
  findByEmail(email: string): Promise<Admin | null>;
}

export { IAdminRepository };
