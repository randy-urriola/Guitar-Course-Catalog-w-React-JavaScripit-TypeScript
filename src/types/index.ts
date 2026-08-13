// Types o interfaces: forma de crear una estructura o agrupar propiedades de un objeto y define que tipo de dato tiene cada propiedad del objeto. Para interface el formato es interface Guitar { propiedad: tipo } y funcionan casi igual, queda a gusto personal
export type Guitar = {
	id: number;
	name: string;
	image: string;
	description: string;
	price: number;
};

export type CartItem = Guitar & {
	quantity: number;
};

// Solo se agregan aqui los types que se usan en diferentes hooks para no duplicar codigo.
// se recomienda crear una carpeta types y un archivo index.ts (tambien se puede llamar types.ts)

// Si un type requiere modificarse (agregando o quitando propiedades) se puede usar la herencia:

// Heredar con types:
// export type CartItem = Guitar & {
// 	quantity: number;
// };

// Heredar con interfaces:
// export interface CartItem extends Guitar {
// 	quantity: number;
// }

// Utility Types (Solo funciona con types): se usan para selccionar elementos especificos para no heredaro todo el type:
// export type CartItem = Pick<Guitar, 'id' | 'name' | 'price'> & {
// 	quantity: number;
// };
// con Pick se especifica el type (Guitar) y despues siguen los elementos separados con | y con & se especifica
// el nuevo elemento (en caso de que se quiera agregar uno nuevo). Otro muy util es Omit en lugar de Pick y
// como su nombre lo dice, es para omitir elementos