import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDb1714395496795 implements MigrationInterface {
  name = 'SeedDb1714395496795';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO tag (name) VALUES ('reactjs'), ('angular'), ('vuejs')`,
    );

    // Note: The password field is hashed using bcrypt
    await queryRunner.query(
      `INSERT INTO users (username, email, password) VALUES ('kiran', 'kiran@mediumclone.com', '$2b$10$JPhgctnWkOcvOGOc9ItIpehRM1sFD/RpHBgxhfOR1en73dBLO4sUa')`,
    );

    await queryRunner.query(
      `INSERT INTO article (slug, title, description, body, "tagList", "authorId") VALUES ('first-test-article', 'First test article', 'First test article description', 'First test article body', 'reactjs,angular', 1), ('second-test-article', 'Second test article', 'Second test article description', 'Second test article body', 'vuejs', 1)`,
    );
  }

  public async down(): Promise<void> {}
}
