import notListError from '../reporters/notListError';

// Some shared data integrity checks for formatters
export default function formattingPreflight(file, format) {
	if (file === '') {
		return [];
	}
	if (!Array.isArray(file)) {
		notListError(format);
	}
	return file;
}
