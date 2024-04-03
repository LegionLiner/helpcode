import { useUserStore } from "../../stores/UserStore";
import { expect, it, vi } from "vitest";

it('Проверка создания пользователя', async () => {
    const store = useUserStore(createPinia());

    store.createUser({
        name: 'Test',
        email: 'testEmail@gmail.com',
        password: "TestPassword12345!"
    });

    expect(store.user).not.toBe({
        name: null,
        email: null,
        phone: null,
        website: null,
        about: null,
        password: null,
        preferences: [],
        featured: {},
        created_at: null,
        active: false,
    });
    expect(store.user.active).toBe(true);
    expect(store.user.name).toBe('Test');
    expect(store.authorized).toBe(true);
});

it('Проверка изменения данных пользователя (с фолбеком)', async () => {
    const store = useUserStore(createPinia());

    store.createUser({
        name: 'Test',
        email: 'testEmail@gmail.com',
        password: "TestPassword12345!"
    });

    expect(() => store.editUserData('password', '123')).toThrowError()
    expect(store.user.password).not.toBe('123');
});

it('Проверка изменения данных пользователя (с прокатом)', async () => {
    const store = useUserStore(createPinia());

    store.createUser({
        name: 'Test',
        email: 'testEmail@gmail.com',
        password: "TestPassword12345!"
    });
    const spy = vi.spyOn(store, 'editUserData');

    expect(spy).not.toHaveBeenCalled()
    store.editUserData('name', 'Lol kek')
    expect(spy).toHaveBeenCalled();
    expect(store.user.name).toBe('Lol kek');
});

it('Проверка изменения пароля', async () => {
    const store = useUserStore(createPinia());

    store.createUser({
        name: 'Test',
        email: 'testEmail@gmail.com',
        password: "TestPassword12345!"
    });

    expect(() => store.changePassword('123456789', '123')).toThrowError("Пароли не совпадают");
    expect(() => store.changePassword('123456789', 'TestPassword12345!')).not.toThrowError("Пароли не совпадают");
    expect(store.user.password).toBe("123456789");
});