import { prisma } from "../../../shared/database";
import { Admin } from "../entities/Admin";
import { IAdminRepository } from "./AdminRepositoryInterface";

class AdminRepository implements IAdminRepository {

  async findByEmail(email: string): Promise<Admin | null> {
    const admin = await prisma.admin.findFirst({
      where:  { email },
    });
    return admin;
  }
}

export { AdminRepository }
