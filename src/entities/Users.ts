import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity() // Indica a typeorm que es una entidad
export class Users extends BaseEntity {
  // extends BaseEntity para indicar que es una tabla

  @PrimaryGeneratedColumn() // no hace falta pasar valor
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  password: string;
}
