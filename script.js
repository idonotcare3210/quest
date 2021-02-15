'use strict';

addEventListener('DOMContentLoaded', async () => {

const
	viewportDiv = document.getElementById('viewportDiv'),
	promptForm = document.getElementById('promptForm');
function _removeChildren(node) {
	while (node.firstChild)
		node.removeChild(node.firstChild);
}
function _numkeys(cb) {
	addEventListener('keydown', function _foo(ev) {
		switch (ev.code) {
			case 'Digit1':
				cb(1);
				removeEventListener('keydown', _foo);
				break;
			case 'Digit2':
				cb(2);
				removeEventListener('keydown', _foo);
				break;
			case 'Digit3':
				cb(3);
				removeEventListener('keydown', _foo);
				break;
			case 'Digit4':
				cb(4);
				removeEventListener('keydown', _foo);
				break;
			case 'Digit5':
				cb(5);
				removeEventListener('keydown', _foo);
				break;
			case 'Digit6':
				cb(6);
				removeEventListener('keydown', _foo);
				break;
			case 'Digit7':
				cb(7);
				removeEventListener('keydown', _foo);
				break;
			case 'Digit8':
				cb(8);
				removeEventListener('keydown', _foo);
				break;
			case 'Digit9':
				cb(9);
				removeEventListener('keydown', _foo);
				break;
			case 'Digit0':
				cb(10);
				removeEventListener('keydown', _foo);
				break;
		}
	});
}
function sleep(t) {
	return new Promise(res => {
		setTimeout(() => {
			res();
		}, t);
	});
}
function print(str) {
	let doScroll = viewportDiv.scrollTop >= viewportDiv.scrollHeight - viewportDiv.clientHeight - 8;

	viewportDiv.append(`${str}\n`);

	if (doScroll)
		viewportDiv.scroll({ top: viewportDiv.scrollHeight, behavior: 'auto' });
}
function prompt(str) {
	return new Promise(res => {
		const
			label = document.createElement('label'),
			input = document.createElement('input');
		input.type = 'text'; label.append('> ', input);

		_removeChildren(promptForm);
		if (str)
			promptForm.innerHTML = `<p>${str}</p>`;
		promptForm.append(label);

		input.focus();

		promptForm.addEventListener('submit', ev => {
			_removeChildren(promptForm);
			print(`> ${input.value}`);
			res(input.value);
			ev.preventDefault();
		}, { once: true });
	});
}
function choice(buttons, str) {
	return new Promise(res => {
		function _cb(ret) {
			print(`> ${ret}`);
			_removeChildren(promptForm);
			res(ret);
		}

		_removeChildren(promptForm);
		if (str)
			promptForm.innerHTML = `<p>${str}</p>`;

		for (let i = 0; i < buttons.length; i++) {
			const but = document.createElement('input');
			but.type = 'button';
			but.value = buttons[i];
			but.onclick = () => _cb(i + 1);

			const lbl = document.createElement('label');
			lbl.append(`${i + 1}. `, but);
			
			promptForm.append(lbl, ' ');
		}

		_numkeys(function _bar(val) {
			if (val > buttons.length)
				_numkeys(_bar);
			else
				_cb(val);
		});
	});
}
function confirm(str = 'OK') {
	return new Promise(res => {
		const button = document.createElement('button');
		button.innerText = str;
		button.onclick = () => {
			_removeChildren(promptForm);
			res();
		};

		_removeChildren(promptForm);

		promptForm.append(button);

		button.focus();
	});
}

async function storytime() {

	var name, firsttest, letter, lastword;

	await beginning();
	while (!await main()) {
		await confirm('Продолжить с контрольной точки');
		print('\n\nЗагрузка контрольной точки...');
		await sleep(1000);
		print('');
	}

	async function beginning() {
		print("<<Подсознание>>")
		await sleep(1000)
		print("Bread Studio (c) 2018")
		await sleep(1000)
		print("Пожалуйста, введите ваше имя: ")
		name = await prompt('Моё имя:');

		await sleep(1000)
		print("Система: | Здравствуйте, "+name+".")
		print("         | Для начала работы с аппаратом проведем небольшой тест, чтобы узнать,")
		print("         | умеете ли вы нажимать на единицу и двойку.")
		print("         | Не волнуйтесь. В нём нет неправильного ответа.")
		await sleep(1000)
		print("         | Ситуация: Отцепившийся вагон мчится по рельсам.")
		print("         | На главном пути привязано к рельсам пять человек, на боковом - один.")
		await sleep(1000)
		print("         | Вопрос: Имеет ли моральное право стрелочник перевести")
		print("         | вагон на боковой путь и пожертвовать одим человеком?")
		print("         | Примечание: По ходу всей симуляции ответами могут являться только числа '1' и '2'. ")
		print("         | Выберите ответ: 1. Да")
		print("         |                 2. Нет")
		await sleep(1000)
		firsttest = await choice(['Да', 'Нет'], 'Имеет ли?');

		await sleep(1000)
		print("Система: | Хорошо. Вашего IQ достаточно, чтобы нажимать на нужные клавиши.")
		print("         | Теперь проверим, можете ли вы писать в принципе.")
		print("         | Напишите далее что-то, что считаете обидным. Попробуйте меня оскорбить.")
		await sleep(1000)
		letter = await prompt('Написать что-нибудь обидное...');
		await sleep(1000)
		print("Система: | Достаточно обидно, хорошо. Теперь перейдем к работе.")
		print("         | Мы поместим Вас в подсознание другого человека.")
		print("         | Ваша задача - избежать всех опасностей, потому что, если вы умираете там,")
		print("         | то ваш мозг умирает здесь. Все просто.")
		await sleep(1000)
		print("         | Хотите что-нибудь сказать перед началом, " + name + "?")
		lastword = await prompt('Сказать что-нибудь напоследок');
		await sleep(1000)
		print("Система: | Жаль, что Ваши слова уже ничего не изменят.")
		await sleep(1000)
		print("         | Могу дать вам совет: Постарайтесь не ввязываться ни во что.")
		print("         | Ну что ж. Начнем.")
		print("-----------------------------------------------------------")
		print('');
		await sleep(2000)
	}

	async function main() {
		print("Вы осматриваетесь вокруг и понимаете, что находитесь в лесу.")
		print("Вам не остается ничего, кроме как идти вперед.")
		print("...")
		await sleep(1000)
		print("Вдалеке вы видите дым. Похоже, что-то горит.")
		print("1. Пойти и узнать, что горит.\n2. Пойти в другую сторону.")
		let forest1 = await choice(['Узнаю, что горит', 'Пойду дальше'], 'Куда пойти?');

		if (forest1 === 1) {
			print("Вы пошли в сторону источника дыма.")
			print("...")
			await sleep(1000)
			print("Перед вами горящая машина.")
			print("1. Сесть в горящую машину.\n2. Пойти дальше.")
			let car1 = await choice(['Сяду в горящую машину', 'Пойду дальше'], 'Что делать?');

			if (car1 === 1) {
				print("Вы сели в горящую машину и сгорели.")
				await sleep(1000)
				print('');
				print("-----------------------------------------------------------")
				print("Система: | *смех.mp3*")
				print("         | Прекращение работы симуляции.")
				print("Игра окончена.")
				return false;

			} else {
				print("Вы пошли дальше...")
				await confirm('Продолжить');
				print('');

				print("Вдруг кто-то сзади обращается к вам.")
				print("Вы оборачиваетесь и видите двух парней.")
				print("Парень1: Мистер Анджело?")
				await sleep(1000)
				print('1. "Эээм, да."\n2. "Нет, ребята, вы обознались."')
				let angelo = await choice(['Подтверждаю', 'Отклоняю'], 'Что ответить?');

				if (angelo === 1) {
					await sleep(1000)
					print("Парень1: Мистер Сальери передает вам привет.")
					print("Второй парень быстро достает дробовик и стреляет в вас.")
					print("*выстрел_из_дробовика.mp3*")
					await sleep(1000)
					print('');
					print("-----------------------------------------------------------")
					print("Система: | Прекращение работы симуляции.")
					print("Игра окончена.")
					return false;

				} else {
					print("Парень2: Ой, извините.")
					print("Парни сели в машину и уехали куда-то в лес.")
					await confirm('Продолжить');
					print('');

					print("Обержувшись, вы обнаруживаете себя в магазине одежды.")
					await sleep(1000)
					print("Вы видите, как по магазину разгуливает мужчина с довольно сердитым видом.")
					await sleep(1000)
					print("Он рассматривает шляпы.")
					print("Мужчина подходит к вам.")
					print("Мужик: Слушайте, я тут шляпу выбираю себе.")
					print("       Сколько шляп перемерил - ни одна не подходит.")
					await sleep(1000)
					print("1. Сказать, что вы не разбираетесь в шляпах, и ему лучше спросить у кого-нибудь другого.")
					print('2. Сказать: "Может, вам папаху дать?".')
					let hat = await choice(['Я не разбираюсь', 'Предложу папаху'], 'Предложить помощь мужику?');

					if (hat === 1) {
						await sleep(1000)
						print("Мужик: Эх, ладно.")
						print("Мужик ушел.")
						await confirm('Продолжить');
						print('');

						print("Вы неожиданно оказываетесь в казино.")
						await sleep(1000)
						print("Перед вами парень с колодой карт.")
						await sleep(1000)
						print("Вы чувствуете, что здесь что-то неладно.")
						await sleep(1000)
						print('1. "Ты что дурак? Вы что, действительно здесь все идиоты чтоли, а? Дифиченто какие-то!".')
						print("2. Промолчать.")
						let casino = await choice(['Подниму скандал', 'Промолчу'], 'Что делать?');

						if (casino === 1) {
							await sleep(1000)
							print("Вы устроили скандал.")
							await sleep(1000)
							print("После всего вы вышли из казино.")
							await sleep(1000)
							print("Вдруг, все перед вами погрузилось во тьму...")
							await sleep(1000)
							print('');
							print("-----------------------------------------------------------")
							print("Система: | Прекращение работы симуляции.")
							print("         | Причина: неизвестно.")
							print("         | Вас предупреждали, что не нужно было ни во что ввязываться.")
							print("Игра окончена.")
							return false;

						} else {
							await sleep(1000)
							print("Вы решили промолчать и сыграть в карты.")
							credits();
							return true;
						}

					} else {
						print("Мужик: По %$#@: себе дай.")
						print("Мужик выходит из себя и ударяет вас по голове.")
						await sleep(1000)
						print('');
						print("-----------------------------------------------------------")
						print("Система: | Прекращение работы симуляции.")
						print("         | Вас предупреждали, что не нужно было ни во что ввязываться.")
						print("Игра окончена.")
						return false;
					}
				}
			}

		} else {
			print("Вы пошли в другую сторону.")
			await sleep(1000)
			print('')

			print("Чудом вы оказываетесь в городе.")
			await sleep(1000)
			print("(Не плохой переход, согласен.)")
			await sleep(1000)
			print("Вдруг вы замечаете старушку с кучей сумок, которая переходит дорогу.")
			print("Вы, как настоящий джентельмен, помогаете бабушке перейти дорогу.")
			await sleep(1000)
			print("Старушка: Ох, спасибо, внучек. Спасибо большое.")
			print("          Жаль у меня сейчас тебе отплатить нечем. Ух эти пендосы")
			print("          пенсию нам понизили. Хотя, постой. Есть у меня одна вещь.")
			await sleep(1000)
			print("Бабушка дает вам письмо.")
			await confirm('Продолжить');
			print("Старушка: Вот, внучек, возьми это письмо.")
			print("          Только ты сам его не смотри, а другим показывай.")
			await sleep(1000)
			print("Пока вы разглядывали бумажку, не раскрывая ее, старушка уже исчезла.")
			await sleep(1000)
			print("Вы чувствуете навязчивое желание его прочитать.")
			await sleep(1000)
			print("1. Прочитать.\n2. Не читать письмо.")
			let readcheck = await choice(['Да', 'Нет'], 'Прочитать письмо?');

			if (readcheck === 1) {
				print("Вы не сдержались и прочли письмо.")
				await sleep(1000)
				print('В письме написанно: "' + letter + '".')
				print("Для вас такое было неприятно.")
				await confirm('Продолжить');
				print('');

				print("Вы идете дальше и заходите в бар.")
				print("Бармена в нем нет.")
				print("Вы идеете за стойку, на его место.")
				await sleep(1000)
				print("Вдруг в бар заходит бесконечное число математиков.")
				print("Первый заказывает кружку пива,")
				print("второй - половину кружки,")
				print("третий - четверть, и так далее.")
				print("Вы решаете, что нужно что-то предпринять.")
				print('1. Расчитать все, и дать каждому столько, сколько им нужно.\n2. Сказать: "Во дурачье" и дать две кружки.')
				let pivo = await choice(['Расчитаю', 'Дам две кружки'], 'Что делать?');

				if (pivo === 1) {
					print("Пока вы расчитывали, сколько пива налить каждому, кто-то неожиданно\n ударил вас по голове.")
					return await railway();

				} else {
					print("Вы наливаете две кружки.")
					await confirm('Продолжить');
					print('');

					print("Вдруг вы оказываетесь на другой стороне стойки.")
					await sleep(1000)
					print("Перед вами стоит бармен.")
					print("Бармен обращается к вам.")
					print("Бармен: Налить еще, Рене?")
					await sleep(1000)
					print("Рене? К вам так никто никогда не обращался.")
					print("Вы понимаете, что вы не в своем теле.")
					print("Вы хоть и обладаете скудными знаниями истории, но все же вспоминаете одного Рене.")
					await confirm('Продолжить');
					print("Рене Декарта.")
					await sleep(1000)
					print("Бармен: Алло, Декарт, я тебя спрашиваю. Еще пиво будешь?")
					await sleep(1000)
					print('1. "Да, налей-ка еще."\n2. "Не думаю."')
					let rene = await choice(['Попрошу налить ещё', 'Откажусь'], 'Выпить ещё?');

					if (rene === 1) {
						print("Вы выпили пиво и почувствовали, как вас тянет в сон.")
						print("Вы засыпаете.")
						return await railway();

					} else {
						print("ХЛОП!")
						print("Вы исчезаете.")
						await sleep(1000)
						print('');
						print("-----------------------------------------------------------")
						print("Система: | Прекращение работы симуляции.")
						print("         | Он фактически ПЕРЕСТАЛ СУЩЕСТВОВАТЬ.")
						await sleep(1000)
						print("         | Иронично.")
						print("Игра окончена.")
						return false;
					}
				}

			} else {
				print("Вы решили не читать письмо и пошли дальше.")
				print("Содержание письма вас очень интересовало.")
				await sleep(1000)
				print('');
				print("Вы решили обратиться к случайному мужчине, которого встретили.")
				print("Вы рассказываете мужику то, что только что с вами случилось\nи просите прочитать письмо.")
				print("Мужик: Что? Какое письмо? Это? Хорошо, давай прочитаю.")
				await confirm('Продолжить');
				print("Мужик посмотрел на письмо. Потом посмотрел на вас. Потом снова на\nписьмо.")
				print("По его лицу вы поняли, что он разозлился.")
				print("Мужик набросился на вас и неплохо побил.")
				await confirm('Продолжить');
				print('');

				await sleep(1500)
				print("Очнулись вы в машине скорой помощи.")
				await sleep(1500)
				print("Медик1: Гляди, очухался. Парень, кто ж тебя так?")
				await sleep(1500)
				print("Вы засунули руку в карман и нащупали то самое письмо.")
				await sleep(1500)
				print("Вы достаете его и рассказываете медикам, что случилось.")
				await sleep(1500)
				print("Они посмотрели на вас немного удивленно.")
				await sleep(1500)
				print("Медик2: Тебя из-за этого письма побили? Быть такого не может.")
				await sleep(1500)
				print("Медик1: Ты мужика того запомнил хоть? Ладно, нам письмо покажи.")
				await sleep(1500)
				print("        Посмотрим, что там такого.")
				await sleep(1500)
				print("Вы отдаете медикам письмо.")
				await sleep(1500)
				await confirm('Продолжить');
				print("Пока они читали, их лица заметно изменились.")
				await sleep(1500)
				print("Их брови нахмурились.")
				await sleep(1500)
				print("Два медика дружно побили вас и бросили на дорогу прямо из машины\nскорой помощи.")
				await sleep(1500)
				await confirm('Продолжить');
				print('');

				await sleep(1500)
				print("Пока вы лежали, пытаясь прийти в себя, к вам подъехала\nмашина полиции.")
				await sleep(1500)
				print("Полицейский1: Михалыч, смотри, еще один алкаш, походу.")
				await sleep(1500)
				print("Полицейский2: Весь побитый, ей богу. Давай его в машину,")
				await sleep(1500)
				print("              в отделении разберемся.")
				await sleep(1500)
				await confirm('Продолжить');
				print("Вы очнулись в отделении полиции.")
				await sleep(1500)
				print("Полицейский2: Ох, проснулся. Ну что? Рассказывай, как тебя так?")
				await sleep(1500)
				print("Вы примерно поняли, что происходит.")
				await sleep(1500)
				print("На ваш взгляд, в отделении полиции достаточно безопасно, \nпоэтому вы решили все рассказать.")
				await sleep(1500)
				await confirm('Продолжить');
				print("Полицейский1: Хмм, интересно. Ты, это, можешь заяву здесь на них написать.")
				await sleep(1500)
				print("              Ты же их лица хотя бы запомнил?.")
				await sleep(1500)
				print("              Вот тебе листок, ручка. Попробуй описать все, что случилось.")
				await sleep(1500)
				print("Полицейский2: Ты пока писать будешь, дай нам письмо - мы посмотрим, что там такого.")
				await sleep(1500)
				print("Вы задумались.")
				await sleep(1500)
				print("Вы подумали, отдали письмо и начали писать.")
				await sleep(1500)
				await confirm('Продолжить');
				print("Не прошло и минуты, как вы обернулись...")
				await sleep(1500)
				print("...и увидели злые лица полицейских.")
				await sleep(1500)
				print("Полицейские неплохо избили вас дубинками и отправили в суд.")
				await sleep(1500)
				await confirm('Продолжить');
				print('');

				await sleep(1500)
				print("Очнулись вы уже в зале суда.")
				await sleep(1500)
				print("В кармане у себя вы нащупали то самое письмо и выругались про себя.")
				await sleep(1500)
				print("Судья обратился к вам.")
				await sleep(1500)
				print("Судья: Подсудимый, расскажите нам вашу версию произошедшего.")
				await sleep(1500)
				print("Вы прокрутили в голове все, что произошло за весь день, и рассказали судье.")
				await sleep(1500)
				await confirm('Продолжить');
				print("Судья: Гм... Можете предоставить нам то письмо, которое вы упоминали?")
				await sleep(1500)
				print("Вы сказали судье, что, наверное, не стоит этого делать.")
				await sleep(1500)
				print("Судья: Что это вы? Мы находимся в суде, и причинить вам вреда я не могу.")
				await sleep(1500)
				print("Вы в очередной раз задумались и решили показать письмо.")
				await sleep(1500)
				await confirm('Продолжить');
				print("Судья прочитал письмо, прилюдно избил вас и отправил на смертную казнь.")
				await sleep(1500)
				print("Вы умерли.")
				await sleep(2000)
				print("Игра оконч...")
				await sleep(2500)
				print('');

				print("А, нет, еще не конец.")
				await sleep(1500)
				print("Вы попадаете на тот свет.")
				await sleep(1500)
				print("Вас встречает апостол Петр и спрашивает, что, мол, произошло.")
				await sleep(1500)
				print("Вы неплохо офигели и рассказали ему все: и про старушку, и про мужика, и скорую, и полицейских, и суд.")
				await sleep(1500)
				print("Петр удивился и попросил взглянуть на это письмо.")
				await sleep(1500)
				print("Вам было лень думать в очередной раз и вы отдали письмо.")
				await sleep(1500)
				await confirm('Продолжить');
				print("Петр: Да за такие слова тебе не место в Раю!")
				await sleep(1500)
				print("Апостол избил вас и отправил в Ад.")
				await confirm('Продолжить');
				print('');

				await sleep(1500)
				print("Вы в Аду")
				await sleep(1000)
				print("(!)")
				await sleep(2000)
				print("К вам подходит Черт и спрашивает, как вы сюда попали.")
				await sleep(1500)
				print("Вы понимаете, что дальше Ада уже никуда не уйти, рассказываете абсолютно \nвсе: про старушку, письмо, мужика, скорую, полицейских, судью, казнь и апостола Петра.")
				await sleep(1500)
				print("Черт: Вот это да... Дай сюда это письмо - посмотрю, что там.")
				await sleep(1500)
				await confirm('Продолжить');
				print("      Не бойся, дальше Ада я тебя максимум в океан выкину, начнешь новую жизнь.")
				await sleep(1500)
				print("Звучит не так страшно, поэтому вы соглашаетесь.")
				await sleep(1500)
				print("Черт читает письмо.")
				await sleep(1500)
				print("Черт избивает вас и выкидывает в океан.")
				await sleep(2500)
				print("(Прим. автора - Еще не конец, подождите.)")
				await confirm('Продолжить');
				print('');

				print("Вы очнулись в океане.")
				await sleep(2000)
				print("Вокруг вода, суши не видно.")
				await sleep(2000)
				print("Вы решаете плыть, пока не найдете сушу.")
				await sleep(2000)
				print("Вы плывете день, два, три. Суши все нет.")
				await sleep(2000)
				print("На седьмой день вы все же замечаете остров вдалеке (!) и плывете к нему.")
				await sleep(2000)
				print("Вы даете себе клятву, что, выплыв на сушу, прочитаете это чертово письмо.")
				await sleep(2000)
				print("Вы выплыли на сушу и моментально выхватили письмо.")
				print("Вы раскрываете его...")
				await confirm('Продолжить');
				print('...');
				await sleep(3000)
				print("...а чернила водой смыло.")
				await sleep(1000)
				print('');
				print("-----------------------------------------------------------")
				print("Система: | Прекращение работы симуляции.")
				print("         | Причина: повышение температуры аппарата.")
				print("Игра окончена.")
				await sleep(1500);
				print('');
				print("(Прим. автора - Наконец-то)")
				return false;
			}
		}
	}

	async function railway() {
		await confirm('Продолжить');
		print('');
		print("Вы приходите в себя и понимаете, что не можете двигаться.")
		await sleep(1000)
		print("Вы привязаны к чертовым рельсам.")
		await sleep(1000)
		print("Осмотревшись по сторонам, вы осознаете, что находитесь на \nбоковом пути, а на основном пути точно так же\nпривязано еще 5 человек.")
		await sleep(1000)
		print("Вы слышите шум приближающегося поезда.")
		print("На развилке стоит стрелочник.")
		await confirm('Продолжить');

		if (firsttest === 1) {
			print("Стрелочник очень нервничает и переводит стрелку на боковой путь.")
			print("Вы осознаете до конца, что происходит.")
			await sleep(1000)
			print("Вы кричите.")
			print("Вам уже ничего не поможет.")
			await sleep(1000)
			print('');
			print("-----------------------------------------------------------")
			print("Система: | Прекращение работы симуляции.")
			print("Игра окончена.")
			return false;

		} else {
			print("Стрелочник очень нервничает, но ничего не делает.")
			print("Вы осознаете до конца, что происходит.")
			await sleep(1000)
			print("Вам страшно.")
			print("Тех людей уже ничего не спасет.")
			credits();
			return true;
		}
	}

	async function credits() {
		await sleep(1000)
		print('');
		print("-----------------------------------------------------------")
		print("Система: | Прекращение работы симуляции.")
		print("         | Вы молодец, " + name + "!")
		print("         | Благодаря вам мы знаем, что все работает исправно.")
		print("         | И вы сами не пострадали. Это было просто, не так ли?")
		await confirm();
		print("Система: | Ладно, вы сделали все, что от вас требовалось.")
		print("         | Теперь можете посмотреть коротенькие титры.")
		await sleep(1000)
		print('');
		//                                   |
		print("         |            <<Подсознание>>.")
		await sleep(1000)
		print("         |                Продюсер:")
		print("         |        Гертер Wh1te_Bread Эдуард")
		await sleep(1000)
		print("         |          Главный программист:")
		print("         |        Гертер Wh1te_Bread Эдуард")
		await sleep(1000)
		print("         |            Дизайнер уровней:")
		print("         |        Гертер Wh1te_Bread Эдуард")
		await sleep(1000)
		print("         |           Отдельное спасибо:")
		print("         |        Гертер Wh1te_Bread Эдуард")
		await sleep(1000)
		print("         |                Издатель:")
		print("         |              Bread Studio")
		await sleep(1000)
		print("         |              Порт на веб:")
		print("         |           xXx_epicgamer23_xXx")
		await sleep(1000)
		print("         |  Большое спасибо за игру, " + name + "!")
		await sleep(1000)
		print("         |                  Конец")
		return;
	}

}

storytime();

});
